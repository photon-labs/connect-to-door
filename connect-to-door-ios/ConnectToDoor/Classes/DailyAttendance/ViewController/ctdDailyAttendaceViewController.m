//
//  ctdDailyAttendaceViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <QuartzCore/QuartzCore.h>
#import "ctdDailyAttendaceViewController.h"
#import "ctdSelectViewDailyAttendanceCell.h"
#import "ctdLocalStorage.h"
#import "ctdDailyAttendanceService.h"
#import "ctdDailyAttendanceParser.h"
#import "ctdResponseDailyAttendanceModel.h"
#import "ctdResponseDailyAttendanceListModel.h"
#import "ctdColorUtilities.h"
#import "ctdConstants.h"

@interface ctdDailyAttendaceViewController ()

@end

@implementation ctdDailyAttendaceViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self configureAllComponent];
    
    dailyAttendanceService = [[ctdDailyAttendanceService alloc]init];
    dailyAttendanceService.delegate = self;
    
    updateAttendanceService = [[ctdUpdateAttendaceService alloc]init];
    updateAttendanceService.delegate = self;
    
    [self requestDailyAttendance:[self getEmployeeId] date:dateString];
    
    NSString *previllage = [[NSUserDefaults standardUserDefaults] objectForKey:@"previllage"];
    NSLog(@"previllage ===== %@", previllage);
    
    isAdmin = [previllage isEqualToString:@"Admin"] ? YES: NO;
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillShow:) name:UIKeyboardWillShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillHide:) name:UIKeyboardWillHideNotification object:nil];
}

/*@uathor:aldi_p
 *this method for handle request service daily attendance
 *
 */
-(void)requestDailyAttendance:(NSString*)employeeID date:(NSString*)date{
    [self showActivityIndicator];
    [dailyAttendanceService requestDailyAttendanceToServer:employeeID date:date];
}


-(void)updateAttendance:(NSString*)employeeID date:(NSString*)date checkInTime:(NSString*)checkInTime checkOutTime:(NSString*)checkOutTime presenceId:(NSString*)presenceId{
    [self showActivityIndicator];
    [updateAttendanceService requestUpdateAttendanceToServer:[self getEmployeeId] date:date checkInTime:checkInTime checkOutTime:checkOutTime presenceId:presenceId];
}

- (void)configureAllComponent{
    NSDate *today = [NSDate date];
    dateString = [self paternDateForRequest:today];
    dateTxt.text = dateString;
    UIView *paddingView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    dateTxt.leftView = paddingView;
    dateTxt.leftViewMode = UITextFieldViewModeAlways;
}



-(NSString*)getEmployeeId{
    ctdLocalStorage *local = [[ctdLocalStorage alloc] init];
    return (local.getEmployeeId)?local.getEmployeeId:@"";
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(NSString*)paternDateForRequest:(NSDate*)dateRequest{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd"];
    [formatter setTimeZone:[NSTimeZone timeZoneWithName:@"..."]];
    NSString *stringFromDate = [formatter stringFromDate:dateRequest];
    return stringFromDate;
}

#pragma mark UITableViewDelegate methods

-(NSInteger) numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

-(NSInteger) tableView:(UITableView *)table numberOfRowsInSection:(NSInteger)section
{
    
    return [model.getDailyAttendanceListModels count];/*[dataChartTypeArray count]*/;
    
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *CellIdentifier = @"attendanceCell";
    ctdSelectViewDailyAttendanceCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        NSArray *topLevelObjects = [[NSBundle mainBundle] loadNibNamed:@"ctdSelectViewDailyAttendanceCell" owner:self options:nil];
        cell = [topLevelObjects objectAtIndex:0];
    }
    if( [indexPath row] % 2 == 0){
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"FFFFFF"]];
    }else{
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"cfe9d0"]];
    }
    
    ctdResponseDailyAttendanceListModel *attendanceItem =[model.getDailyAttendanceListModels objectAtIndex:indexPath.row];
    
    //label Number
    cell.numberLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0, 0, 33.0,tableView.rowHeight)];
    [cell addColumn:50];
    cell.numberLabel.font = [UIFont systemFontOfSize:12.0];
    cell.numberLabel.text = [NSString stringWithFormat:@"%d.", indexPath.row + 1];
    cell.numberLabel.textColor = [UIColor blackColor];
    cell.numberLabel.textAlignment = NSTextAlignmentCenter;
    cell.numberLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:cell.numberLabel];
    
    //Saparator Number
    UIImageView *separator = [[UIImageView alloc] initWithFrame:CGRectMake(34.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:60];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label name employee
    cell.nameLabel =  [[UILabel alloc] initWithFrame:CGRectMake(38, 0, 146.0,tableView.rowHeight)];
    [cell addColumn:70];
    cell.nameLabel.font = [UIFont systemFontOfSize:12.0];
    cell.nameLabel.text = attendanceItem.employeeName;
    cell.nameLabel.textColor = [UIColor blackColor];
    cell.nameLabel.textAlignment = NSTextAlignmentLeft;
    cell.nameLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:cell.nameLabel];
    
    //saparator name employee
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(310.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:80];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label checkin
    cell.checkinLabel =  [[UILabel alloc] initWithFrame:CGRectMake(305.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:90];
    cell.checkinLabel.font = [UIFont systemFontOfSize:12.0];
    cell.checkinLabel.text = attendanceItem.checkIn;
    cell.checkinLabel.textColor = [UIColor blackColor];
    cell.checkinLabel.textAlignment = NSTextAlignmentCenter;
    cell.checkinLabel.backgroundColor = [UIColor clearColor];
    cell.checkinLabel.hidden = NO;
    [cell.contentView addSubview:cell.checkinLabel];
    
    
    cell.checkinField =  [[ctdCustomTextField alloc] initWithFrame:CGRectMake(313.0, 0, 68.0,tableView.rowHeight)];
    [cell addColumn:90];
    cell.checkinField.font = [UIFont systemFontOfSize:12.0];
    cell.checkinField.text = attendanceItem.checkIn;
    cell.checkinField.textColor = [UIColor blackColor];
    cell.checkinField.textAlignment = NSTextAlignmentCenter;
    cell.checkinField.backgroundColor = [UIColor whiteColor];
    [cell.checkinField.layer setBorderColor: [[UIColor grayColor] CGColor]];
    [cell.checkinField.layer setBorderWidth: 1.0];
    cell.checkinField.hidden = YES;
    cell.checkinField.delegate = self;
    cell.checkinField.returnKeyType = UIReturnKeyDone;
    cell.checkinField.contentVerticalAlignment = UIControlContentVerticalAlignmentCenter;
    [cell.contentView addSubview:cell.checkinField];
    
    //saparator checkin
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(382.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:100];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label checkout
    cell.checkOutLabel =  [[UILabel alloc] initWithFrame:CGRectMake(374.0, 0, 88.0,tableView.rowHeight)];
    [cell addColumn:110];
    cell.checkOutLabel.font = [UIFont systemFontOfSize:12.0];
    cell.checkOutLabel.text = attendanceItem.checkOut;
    cell.checkOutLabel.textColor = [UIColor blackColor];
    cell.checkOutLabel.textAlignment = NSTextAlignmentCenter;
    cell.checkOutLabel.backgroundColor = [UIColor clearColor];
    cell.checkOutLabel.hidden = NO;
    [cell.contentView addSubview:cell.checkOutLabel];
    
    cell.checkOutField =  [[ctdCustomTextField alloc] initWithFrame:CGRectMake(385.0, 0, 68.0,tableView.rowHeight)];
    [cell addColumn:90];
    cell.checkOutField.font = [UIFont systemFontOfSize:12.0];
    cell.checkOutField.text = attendanceItem.checkOut;
    cell.checkOutField.textColor = [UIColor blackColor];
    cell.checkOutField.textAlignment = NSTextAlignmentCenter;
    cell.checkOutField.backgroundColor = [UIColor whiteColor];
    [cell.checkOutField.layer setBorderColor: [[UIColor grayColor] CGColor]];
    [cell.checkOutField.layer setBorderWidth: 1.0];
    cell.checkOutField.returnKeyType = UIReturnKeyDone;
    cell.checkOutField.hidden = YES;
    cell.checkOutField.delegate = self;
    cell.checkOutField.contentVerticalAlignment = UIControlContentVerticalAlignmentCenter;
    [cell.contentView addSubview:cell.checkOutField];
    
    //saparator checkout
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(455.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:120];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label edit by
    cell.editByLabel =  [[UILabel alloc] initWithFrame:CGRectMake(465.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:130];
    cell.editByLabel.font = [UIFont systemFontOfSize:12.0];
    cell.editByLabel.text = attendanceItem.previlage;
    cell.editByLabel.textColor = [UIColor blackColor];
    cell.editByLabel.textAlignment = NSTextAlignmentCenter;
    cell.editByLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:cell.editByLabel];
    
    cell.editButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [cell.editButton addTarget:self
                        action:@selector(editClicked:)
              forControlEvents:UIControlEventTouchDown];
    [cell.editButton setImage:[UIImage imageNamed:@"button_small_edit.png"] forState:UIControlStateNormal];
    cell.editButton.frame = CGRectMake(615, 0, 60, 33);
    cell.editButton.hidden = YES;
    [cell.contentView addSubview:cell.editButton];
    if([indexPathClicked isEqual:indexPath]){
        [self animateShowEditButton:cell.editButton];
    }
    
    UISwipeGestureRecognizer *showExtrasSwipe = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(cellSwipe:)];
    showExtrasSwipe.direction = (UISwipeGestureRecognizerDirectionRight | UISwipeGestureRecognizerDirectionLeft);
    [tableView addGestureRecognizer:showExtrasSwipe];
    
    return cell;}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    // By default, allow row to be selected
    return indexPath;
}

-(CGFloat)tableView:(UITableView*)tableView heightForFooterInSection:(NSInteger)section
{
    return 0.01f;
}

- (UITableViewCellEditingStyle)tableView:(UITableView *)aTableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath {
    // Detemine if it's in editing mode
    if (self.editing) {
        return UITableViewCellEditingStyleDelete;
    }
    return UITableViewCellEditingStyleNone;
}


-(void)cellSwipe:(UISwipeGestureRecognizer *)gesture
{
    if(isAdmin){
        CGPoint location = [gesture locationInView:itemAttendacen];
        
        NSIndexPath *swipedIndexPath = [itemAttendacen indexPathForRowAtPoint:location];
        
        ctdSelectViewDailyAttendanceCell *cell = (ctdSelectViewDailyAttendanceCell*)[itemAttendacen cellForRowAtIndexPath:swipedIndexPath];
        
        UIImage *selectedImg=[UIImage imageNamed:@"button_small_edit.png"];
        if (cell.editButton.currentImage == selectedImg )
        {
            if(![indexPathClicked isEqual:swipedIndexPath]){
                indexPathClicked = swipedIndexPath;
                [itemAttendacen reloadData];
            }else{
                [self animateHideSaveButton:cell.editButton];
                indexPathClicked = NULL;
                [itemAttendacen reloadData];
            }
        }
    }
    
}

- (void)doneEdit:(ctdSelectViewDailyAttendanceCell*)cell{
    
    cell.checkinField.hidden = YES;
    cell.checkinLabel.hidden = NO;
    
    cell.checkOutField.hidden = YES;
    cell.checkOutLabel.hidden = NO;
    
    [self hideKeyboard:cell.checkinField];
    [self hideKeyboard:cell.checkOutField];
    
    indexPathClicked = NULL;
    [itemAttendacen reloadData];
}

- (void)editClicked:(id)sender{
    CGPoint buttonPosition = [sender convertPoint:CGPointZero toView:itemAttendacen];
    NSIndexPath *indexPath = [itemAttendacen indexPathForRowAtPoint:buttonPosition];
    if (indexPath != nil)
    {
        ctdSelectViewDailyAttendanceCell *cell = (ctdSelectViewDailyAttendanceCell*)[itemAttendacen cellForRowAtIndexPath:indexPath];
        
        UIImage *selectedImg=[UIImage imageNamed:@"button_small_edit.png"];
        if (cell.editButton.currentImage == selectedImg )
        {
            [cell.editButton setImage:[UIImage imageNamed:@"button_small_save.png"] forState:UIControlStateNormal];
            cell.checkinField.hidden = NO;
            cell.checkinLabel.hidden = YES;
            
            cell.checkOutField.hidden = NO;
            cell.checkOutLabel.hidden = YES;
            
            [cell.checkinField becomeFirstResponder];
        }
        else
        {
            if((cell.checkinField.text.length == 0 || cell.checkinField.text.length == 5) && (cell.checkOutField.text.length == 0 || cell.checkOutField.text.length == 5)){
                [self hideKeyboard:cell.checkinField];
                [self hideKeyboard:cell.checkOutField];
                [self savedButtonClicked:cell indexPath:indexPath];
            }
            
        }
    }
    
    
}

- (void)savedButtonClicked:(ctdSelectViewDailyAttendanceCell*)cell indexPath:(NSIndexPath*)indexPath{
    
    ctdResponseDailyAttendanceListModel *attendanceItem =[model.getDailyAttendanceListModels objectAtIndex:indexPath.row];
    [self updateAttendance:[self getEmployeeId] date:dateTxt.text checkInTime:cell.checkinField.text checkOutTime:cell.checkOutField.text presenceId:attendanceItem.presenceId];
}

- (void)hideKeyboard:(UITextField*)textField{
    [textField resignFirstResponder];
}


- (void)animateShowEditButton:(UIButton*)button{
    [UIView animateWithDuration:0.2 delay: 0.0 options: UIViewAnimationOptionCurveEaseIn animations:^{
        button.frame = CGRectMake(615, 0, 60, 33);
    }
                     completion:^(BOOL finished){ }
     ];
    
    button.hidden = NO;
}

- (void)animateHideSaveButton:(UIButton*)button{
    button.frame = CGRectMake(615, 0, 60, 33);
    [UIView animateWithDuration:0.2 delay: 0.0 options: UIViewAnimationOptionCurveEaseIn animations:^{
        button.frame = CGRectMake(675, 0, 0, 33);
    }
                     completion:^(BOOL finished){
                         button.hidden = YES;
                     }
     ];
    
    
}

#pragma mark DailyAttendanceService methods
- (void)didReceivedDailyAttendanceResponse:(NSString*)response{
    [self hideActivityIndicator];
    ctdDailyAttendanceParser *parser = [[ctdDailyAttendanceParser alloc] init];
    model = [parser parseResponse:response];
    [itemAttendacen reloadData];
}

- (void)didReceiveDailyAttendanceErrorResponse:(NSError*)error{
    [self hideActivityIndicator];
    NSLog(@"ERROR RESPONSE : %@", error);
}


- (IBAction)didDatePickerClicked:(id)sender{
    datePickerActive = DATE_END;
    CGFloat dateEndX = CGRectGetMaxX(dateBtn.frame);
    CGFloat dateEndY = CGRectGetMaxY(dateBtn.frame);
    [self createPopUpCalendarWithValidation:dateEndX :dateEndY];
}

- (void) createPopUpCalendar :(CGFloat)positionX :(CGFloat)positionY
{
    calendar = [[CKCalendarView alloc] initWithStartDay:startMonday];
    calendar.delegate = self;
    
    calendar.onlyShowCurrentMonth = NO;
    calendar.adaptHeightToNumberOfWeeksInMonth = YES;
    
    calendar.frame = CGRectMake(positionX, positionY, 300, 320);
}

- (void) createPopUpCalendarWithValidation :(CGFloat)positionX :(CGFloat)positionY
{
    if([calendar isDescendantOfView:self.view]){
        [self removePopUp];
    } else {
        [self createPopUpCalendar:positionX :positionY];
        [self.view addSubview:calendar];
    }
}

- (void) removePopUp
{
    datePickerActive = @"";
    calendar.delegate = nil;
    [calendar removeFromSuperview];
    calendar = nil;
}

#pragma mark - CKCalendarDelegate
- (void)calendar:(CKCalendarView *)calendar didSelectDate:(NSDate *)date
{
    dateTxt.text = [self paternDateForRequest:date];
    [self removePopUp];
    [self requestDailyAttendance:[self getEmployeeId] date:[self paternDateForRequest:date]];
}

- (IBAction)didPrintClicked:(id)sender{
    [self showAlert:kAlertUnderConstruction];
}

#pragma mark - Update Attendance Service Delegate

- (void)didReceivedUpdateAttendanceResponse:(NSString*)response{
    [self hideActivityIndicator];
    [self requestDailyAttendance:[self getEmployeeId] date:dateTxt.text];
    indexPathClicked = NULL;
}

- (void)didReceiveUpdateAttendanceErrorResponse:(NSError*)error{
    [self hideActivityIndicator];
    ctdSelectViewDailyAttendanceCell *cell = (ctdSelectViewDailyAttendanceCell*)[itemAttendacen cellForRowAtIndexPath:indexPathClicked];
    [self doneEdit:cell];
    [self showAlert:kAlertForException];
}


- (void)releaseDelegates{
    NSLog(@"masuk releaseDelegates ");
    dailyAttendanceService.delegate = nil;
    updateAttendanceService.delegate = nil;
    itemAttendacen.delegate = nil;
    itemAttendacen.dataSource = nil;
    calendar.delegate = nil;
    [super releaseDelegates];
}

- (void)invalidate{
    
}


- (BOOL)textFieldShouldReturn:(UITextField *)textfield {
    [textfield resignFirstResponder];
    return YES;
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    // You should already have set some string in the text field
    if ([string length] == 0)
        return YES;
    
    if ([textField.text length] > 4)
        return NO;
    
    NSCharacterSet* notDigits = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
    if ([string rangeOfCharacterFromSet:notDigits].location == NSNotFound)
    {
        int value = [string intValue];
        
        
        if(range.location == 0){
            if(value > 2){
                return NO;
            }
        }else if(range.location == 1){
            int firstTextFieldValue = [[textField.text substringToIndex:1] intValue];
            if(firstTextFieldValue > 1  && value > 9)
                return NO;
            if(firstTextFieldValue == 2 && value > 3)
                return NO;
        }else if(range.location == 2){
            if(value < 6){
                textField.text = [NSString stringWithFormat:@"%@:%@", textField.text, string];
            }
            return NO;
        }
        else if(range.location == 3 || range.location ==4){
            if(value > 5){
                return NO;
            }
        }
        // newString consists only of the digits 0 through 9
        
        
        return YES;
    }
    
    // Return NO if you do not want to let user make any changes, otherwise YES
    return NO;
}

- (void)keyboardWillShow:(NSNotification *)sender
{
    CGSize kbSize = [[[sender userInfo] objectForKey:UIKeyboardFrameEndUserInfoKey] CGRectValue].size;
    NSTimeInterval duration = [[[sender userInfo] objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
    
    [UIView animateWithDuration:duration animations:^{
        UIEdgeInsets edgeInsets = UIEdgeInsetsMake(0, 0, kbSize.height, 0);
        [itemAttendacen setContentInset:edgeInsets];
        [itemAttendacen setScrollIndicatorInsets:edgeInsets];
        if(indexPathClicked.row > 4){
            [itemAttendacen scrollToRowAtIndexPath:indexPathClicked atScrollPosition:UITableViewScrollPositionTop animated:NO];
            CGPoint point = itemAttendacen.contentOffset;
            point .y -= itemAttendacen.rowHeight;
            itemAttendacen.contentOffset = point;
        }
    }];
}

- (void)keyboardWillHide:(NSNotification *)sender
{
    NSTimeInterval duration = [[[sender userInfo] objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
    
    [UIView animateWithDuration:duration animations:^{
        UIEdgeInsets edgeInsets = UIEdgeInsetsZero;
        [itemAttendacen setContentInset:edgeInsets];
        [itemAttendacen setScrollIndicatorInsets:edgeInsets];
    }];
}

@end
